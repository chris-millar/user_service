class Importer
  def self.import_from(csv_file)
    raw_users = CSV.open(csv_file, headers: true, return_headers: false).map(&:fields)

    raw_users.map do |raw_user|
      raw_hash(raw_user)
      User.create(**raw_hash(raw_user))
    end
  end

  private

  def self.raw_hash(raw_user_fields_array)
    {
      id: raw_user_fields_array[0].to_i,
      first_name: raw_user_fields_array[1],
      last_name: raw_user_fields_array[2],
      email: raw_user_fields_array[3],
      profession: raw_user_fields_array[4],
      created_at: DateTime.parse(raw_user_fields_array[5]),
      country: raw_user_fields_array[6],
      city: raw_user_fields_array[7],
    }
  end
end