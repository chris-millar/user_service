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
          expect(response_json[:metadata]).to include(
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
          expect(response_json[:metadata]).to include(
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
        expect(response_json[:metadata]).to include(
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
        expect(response_json[:metadata]).to include(
          page: 1,
          prev: nil,
          next: nil,
          last: 1,
          count: 0,
          pages: 1
        )
      end

    end
  end
end
