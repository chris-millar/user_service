require "rails_helper"

RSpec.describe "UsersController", type: :request do
  context "#show" do
    context "when the user exists" do
      let!(:existing_user) {
        User.create(
          first_name: "Alice",
          last_name: "Smith",
          email: "alice.smith@email.com",
          profession: "writer",
          country: "United Kingdom",
          city: "London",
          created_at: Time.new(2024, 1, 12, 5, 0, 0)
        )
      }

      it "returns the requested user as json" do
        headers = { "ACCEPT" => "application/json" }
        get "/users/#{existing_user.id}", headers: headers

        expect(response.status).to eq(200)
        response_json = JSON.parse(response.body)
        expect(response_json).to include(
          "first_name" => existing_user.first_name,
          "last_name" => existing_user.last_name,
          "email" => existing_user.email,
          "profession" => existing_user.profession,
          "country" => existing_user.country,
          "city" => existing_user.city
        )
      end
    end
  end
end
