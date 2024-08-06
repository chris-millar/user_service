require "rails_helper"

RSpec.describe "Api::UsersController", type: :request do
  context "#show" do
    context "when the requested user exists" do
      let!(:existing_user) { create(:user) }

      it "returns the requested user as json" do
        get "/users/#{existing_user.id}", headers: api_headers

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
        get "/users/#{existing_user.id}", headers: api_headers

        expect(response_json).to include(
          date_created: existing_user.created_at.iso8601,
          date_updated: existing_user.updated_at.iso8601
        )
      end
    end

    context "when the requested user is not found" do
      it "returns a 404 error payload" do
        get "/users/1", headers: api_headers

        expect(response.status).to eq(404)
        expect(response_json).to include(
          error: "No record found!",
        )
      end
    end
  end
end
