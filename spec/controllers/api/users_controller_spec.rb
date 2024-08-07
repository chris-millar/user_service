require "rails_helper"

RSpec.describe "Api::UsersController", type: :request do
  context "#show" do
    context "when the requested user exists" do
      let!(:existing_user) { create(:user) }

      it "returns the requested user as json" do
        get "/api/users/#{existing_user.id}", headers: api_headers

        expect(response.status).to eq(200)
        expect(response_json).to include(
          first_name: existing_user.first_name,
          last_name: existing_user.last_name,
          email: existing_user.email,
          profession: existing_user.profession,
          country: existing_user.country,
          city: existing_user.city
        )
      end

      it "aliases timestamps as date_created and date_updated and formats them as iso8601" do
        get "/api/users/#{existing_user.id}", headers: api_headers

        expect(response_json).to include(
          date_created: existing_user.created_at.iso8601,
          date_updated: existing_user.updated_at.iso8601
        )
      end
    end

    context "when the requested user is not found" do
      it "returns a 404 error payload" do
        get "/api/users/1", headers: api_headers

        expect(response.status).to eq(404)
        expect(response_json).to include(
          error: "No record found!",
        )
      end
    end
  end

  context "#index" do
    context "with no query filtering (other than paging)" do
      context "when there are multiple pages worth of Users" do
        let!(:users) { create_list(:user, Api::PaginationHelper.limit + 1) }

        it "returns paginated results for first page" do
          get "/api/users", headers: api_headers, params: { }

          expect(response.status).to eq(200)
          expect(response_json[:data].size).to eq(Api::PaginationHelper.limit)
          expect(response_json[:metadata][:paging]).to include(
            page: 1,
            prev: nil,
            next: 2,
            last: 2,
            count: users.size,
            pages: 2
          )
        end

        it "returns additional pages when queried" do
          get "/api/users", headers: api_headers, params: { page: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:data].size).to eq(1)
          expect(response_json[:metadata][:paging]).to include(
            page: 2,
            prev: 1,
            next: nil,
            last: 2,
            count: users.size,
            pages: 2
          )
        end
      end

      it "returns paginated results even for a single page" do
        users = create_list(:user, Api::PaginationHelper.limit - 1)

        get "/api/users", headers: api_headers, params: { }

        expect(response.status).to eq(200)
        expect(response_json[:data].size).to eq(Api::PaginationHelper.limit - 1)
        expect(response_json[:metadata][:paging]).to include(
          page: 1,
          prev: nil,
          next: nil,
          last: 1,
          count: users.size,
          pages: 1
        )
      end

      it "returns empty results when there are no Users" do
        User.all.each { |user| user.destroy }

        get "/api/users", headers: api_headers, params: { page_limit: 2 }

        expect(response.status).to eq(200)
        expect(response_json[:data].size).to eq(0)
        expect(response_json[:metadata][:paging]).to include(
          page: 1,
          prev: nil,
          next: nil,
          last: 1,
          count: 0,
          pages: 1
        )
      end
    end

    context "with query filtering" do
      it "returns empty filtering metadata if no filters applied" do
        get "/api/users", headers: api_headers, params: { page_limit: 2 }
        expect(response.status).to eq(200)
        expect(response_json[:metadata][:filters]).to eq({})
      end

      context "on profession" do
        let!(:programmer_users) { create_list(:user, Api::PaginationHelper.limit + 1, profession: "programmer") }
        let!(:doctor_users) { create_list(:user, Api::PaginationHelper.limit + 2, profession: "doctor") }

        it "returns all Users with the matching profession" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: ["writer"], page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size)
          expect(response_json[:metadata][:filters]).to include(
            profession: { value: ["writer"], operator: "in" }
          )
          expect(response_json[:data].all? { |user| user[:profession] === "writer" }).to be(true)
        end

        it "accepts profession as a string instead of an array" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: "writer", page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size)
          expect(response_json[:metadata][:filters]).to include(
            profession: { value: "writer", operator: "eq" }
          )
          expect(response_json[:data].all? { |user| user[:profession] === "writer" }).to be(true)
        end

        it "can filter by more than 1 profession at a time" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: %w[writer programmer], page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size + programmer_users.size)
          expect(response_json[:data].all? { |user| %w[writer programmer].include?(user[:profession]) }).to be(true)
        end

        it "is optional" do
          get "/api/users", headers: api_headers, params: { page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(User.count)
        end

        it "ignores unknown professions" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: %w[writer made_up_profession], page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size)
          expect(response_json[:data].all? { |user| user[:profession] === "writer" }).to be(true)
        end

        it "can return no results" do
          get "/api/users", headers: api_headers, params: { profession: %w[made_up_profession], page_limit: 2 }
          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(0)
        end

        it "specifies the filter criteria in the response metadata" do
          get "/api/users", headers: api_headers, params: { profession: %w[programmer], page_limit: 2 }
          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(programmer_users.size)
          expect(response_json[:metadata][:filters]).to include({ profession: { value: %w[programmer], operator: "in"}})
        end
      end

      context "on date_created" do
        let!(:monday_user) { create(:user, created_at: DateTime.new(2024,8,5)) }
        let!(:tuesday_user) { create(:user, created_at: DateTime.new(2024,8,6)) }
        let!(:wednesday_user_one) { create(:user, created_at: DateTime.new(2024,8,7)) }
        let!(:wednesday_user_two) { create(:user, created_at: DateTime.new(2024,8,7)) }
        let!(:thursday_user) { create(:user, created_at: DateTime.new(2024,8,8)) }

        it "accepts a single date value and returns all users created on that exact date" do
          get "/api/users", headers: api_headers, params: { date_created: "2024-08-07", page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(2)
          expect(response_json[:metadata][:filters]).to include(
            date_created: { value: "2024-08-07", operator: "eq" }
          )
          expect(response_json[:data].all? { |user| user[:date_created].to_date === "2024-08-07".to_date }).to be(true)
        end

        it "gte" do
          get "/api/users", headers: api_headers, params: { "date_created[gte]" => "2024-08-07", page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(3)
          expect(response_json[:metadata][:filters]).to include(
            "date_created[gte]": { value: "2024-08-07", operator: "gte" }
          )
          expect(response_json[:data].all? { |user| user[:date_created] >= "2024-08-07" }).to be(true)
        end

        it "gt" do
          get "/api/users", headers: api_headers, params: { "date_created[gt]" => "2024-08-07", page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(1)
          expect(response_json[:metadata][:filters]).to include(
            "date_created[gt]": { value: "2024-08-07", operator: "gt" }
          )
          expect(response_json[:data].all? { |user| user[:date_created] > "2024-08-07" }).to be(true)
        end

        it "lte" do
          get "/api/users", headers: api_headers, params: { "date_created[lte]" => "2024-08-07", page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(4)
          expect(response_json[:metadata][:filters]).to include(
            "date_created[lte]": { value: "2024-08-07", operator: "lte" }
          )
          expect(response_json[:data].all? { |user| user[:date_created] <= "2024-08-07" }).to be(true)
        end

        it "lt" do
          get "/api/users", headers: api_headers, params: { "date_created[lt]" => "2024-08-07", page_limit: 2 }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(2)
          expect(response_json[:metadata][:filters]).to include(
            "date_created[lt]": { value: "2024-08-07", operator: "lt" }
          )
          expect(response_json[:data].all? { |user| user[:date_created] < "2024-08-07" }).to be(true)
        end

        it "supports multiple operators being applied at once" do
          get "/api/users", headers: api_headers, params: {
            "date_created[gt]" => "2024-08-05",
            "date_created[lt]" => "2024-08-08",
            page_limit: 2
          }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(3)
          expect(response_json[:metadata][:filters]).to include(
            "date_created[gt]": { value: "2024-08-05", operator: "gt" },
            "date_created[lt]": { value: "2024-08-08", operator: "lt" }
          )
          expect(response_json[:data].all? do |user|
            "2024-08-05" < user[:date_created] && user[:date_created] < "2024-08-08"
          end).to be(true)
        end
      end
    end

    context "with sorting" do
      let!(:first_user) { create(:user, created_at: DateTime.new(2024,8,5)) }
      let!(:second_user) { create(:user, created_at: DateTime.new(2024,8,6)) }

      it "defaults to asc order sort" do
        get "/api/users", headers: api_headers, params: { page_limit: 2 }

        expect(response.status).to eq(200)
        expect(response_json[:metadata][:paging][:count]).to eq(2)
        expect(response_json[:metadata][:filters]).to eq({})
        expect(response_json[:metadata][:sort]).to eq({ date_created: "asc" })
        expect(response_json[:data].first[:id]).to eq(first_user.id)
        expect(response_json[:data].last[:id]).to eq(second_user.id)
      end

      it "takes sort_order param :asc" do
        get "/api/users", headers: api_headers, params: { sort_order: "asc", page_limit: 2 }

        expect(response.status).to eq(200)
        expect(response_json[:metadata][:paging][:count]).to eq(2)
        expect(response_json[:metadata][:filters]).to eq({})
        expect(response_json[:metadata][:sort]).to eq({ date_created: "asc" })
        expect(response_json[:data].first[:id]).to eq(first_user.id)
        expect(response_json[:data].last[:id]).to eq(second_user.id)
      end

      it "takes sort_order param :desc" do
        get "/api/users", headers: api_headers, params: { sort_order: "desc", page_limit: 2 }

        expect(response.status).to eq(200)
        expect(response_json[:metadata][:paging][:count]).to eq(2)
        expect(response_json[:metadata][:sort]).to eq({ date_created: "desc" })
        expect(response_json[:data].first[:id]).to eq(second_user.id)
        expect(response_json[:data].last[:id]).to eq(first_user.id)
      end
    end
  end
end
