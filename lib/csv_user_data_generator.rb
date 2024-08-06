class CsvUserDataGenerator
  HEADERS = %w[id firstname lastname email profession dateCreated country city]

  def self.generate_csv(size: 5, file_name: "users.csv", start_id_offset: 1)
    rows = size.times.map do |id|
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name
      email = Faker::Internet.email(name: "#{first_name} #{last_name}", separators: ['.'])
      profession = Faker::Job.field
      date_created = DateTime.current.to_date
      country = Faker::Address.country
      city = Faker::Address.city

      [id + start_id_offset, first_name, last_name, email, profession, date_created, country, city]
    end

    File.write(file_name, rows.insert(0, HEADERS).map(&:to_csv).join)
  end
end