require "rails_helper"

RSpec.describe User do
  it "has expected properties" do
    User.create(
      first_name: "Alice",
      last_name: "Smith",
      email: "alice.smith@email.com",
      profession: "writer",
      country: "United Kingdom",
      city: "London",
      created_at: Time.new(2024, 1, 12, 5, 0, 0)
    )
    expect(User.count).to eq(1)
  end

  context "hooks" do
    it "enforces downcased email field values" do
      User.create(
        first_name: "Alice",
        last_name: "Smith",
        email: "Alice.Smith@Email.com",
        profession: "writer",
        country: "United Kingdom",
        city: "London",
        created_at: Time.new(2024, 1, 12, 5, 0, 0)
      )
      expect(User.first.email).to eq("alice.smith@email.com")
    end

    it "enforces downcased profession field values" do
      User.create(
        first_name: "Alice",
        last_name: "Smith",
        email: "alice.smith@email.com",
        profession: "Fire Fighter",
        country: "United Kingdom",
        city: "London",
        created_at: Time.new(2024, 1, 12, 5, 0, 0)
      )
      expect(User.first.profession).to eq("fire fighter")
    end
  end
end
