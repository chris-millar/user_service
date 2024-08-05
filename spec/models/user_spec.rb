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
end
