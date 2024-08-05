require "test_helper"

RSpec.describe User do
  it "has expected properties" do
    expect {
      User.create(
        first_name: "Alice",
        last_name: "Smith",
        email: "alice.smith@email.com",
        profession: "writer",
        country: "United Kingdom",
        city: "London",
        created_at: Time.new(2024, 1, 12, 5, 0, 0)
      )
    }.to change(User.count).by(1)
  end
end
