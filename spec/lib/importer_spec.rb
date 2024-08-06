require 'spec_helper'

RSpec.describe "Importer" do

  context "#import_from" do
    it "creates all users from a csv" do
      expect {
        Importer.import_from("./spec/test_data/test_users.csv")
      }.to change { User.count }.from(0).to(5)
    end

    it "includes all the properties, including using the id and parsing the dateCreated" do
        Importer.import_from("./spec/test_data/test_users.csv")

        user = User.find(4)
        expect(user.first_name).to eq("Rafael")
        expect(user.last_name).to eq("DuBuque")
        expect(user.email).to eq("rafael.dubuque@kirlin.example")
        expect(user.profession).to eq("farming")
        expect(user.created_at).to eq(DateTime.parse("2024-08-06"))
        expect(user.country).to eq("Holy See (Vatican City State)")
        expect(user.city).to eq("Deckowfurt")
    end
  end
end
