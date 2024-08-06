require "rails_helper"

RSpec.describe "Api::UsersController", type: :request do
  context "#show" do
    context "when the requested user exists" do
      let!(:existing_user) { create(:user) }

      it "returns the requested user as json" do
        get "/api/users/#{existing_user.id}", headers: api_headers

        expect(response.status).to eq(200)
        expect(response_json[:user]).to include(
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

        expect(response_json[:user]).to include(
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
          get "/api/users", headers: api_headers

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

        get "/api/users", headers: api_headers

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

        get "/api/users", headers: api_headers

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
        get "/api/users", headers: api_headers, params: { }
        expect(response.status).to eq(200)
        expect(response_json[:metadata][:filters]).to eq({})
      end

      context "on profession" do
        let!(:programmer_users) { create_list(:user, Api::PaginationHelper.limit + 1, profession: "programmer") }
        let!(:doctor_users) { create_list(:user, Api::PaginationHelper.limit + 2, profession: "doctor") }

        it "returns all Users with the matching profession" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: ["writer"] }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size)
          expect(response_json[:metadata][:filters]).to include(
            profession: { value: ["writer"], operator: "in" }
          )
          expect(response_json[:data].all? { |user| user[:profession] === "writer" }).to be(true)
        end

        it "can take a single value for an array param filter" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: "writer" }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size)
          expect(response_json[:metadata][:filters]).to include(
            profession: { value: "writer", operator: "in" }
          )
          expect(response_json[:data].all? { |user| user[:profession] === "writer" }).to be(true)
        end

        it "can filter by more than 1 profession at a time" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: %w[writer programmer] }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size + programmer_users.size)
          expect(response_json[:data].all? { |user| %w[writer programmer].include?(user[:profession]) }).to be(true)
        end

        it "is optional" do
          get "/api/users", headers: api_headers, params: { }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(User.count)
        end

        it "ignores unknown professions" do
          writer_users = create_list(:user, Api::PaginationHelper.limit - 1, profession: "writer")

          get "/api/users", headers: api_headers, params: { profession: %w[writer made_up_profession] }

          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(writer_users.size)
          expect(response_json[:data].all? { |user| user[:profession] === "writer" }).to be(true)
        end

        it "can return no results" do
          get "/api/users", headers: api_headers, params: { profession: %w[made_up_profession] }
          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(0)
        end

        it "specifies the filter criteria in the response metadata" do
          get "/api/users", headers: api_headers, params: { profession: %w[programmer] }
          expect(response.status).to eq(200)
          expect(response_json[:metadata][:paging][:count]).to eq(programmer_users.size)
          expect(response_json[:metadata][:filters]).to include({ profession: { value: %w[programmer], operator: "in"}})
        end
      end
    end
  end
end
