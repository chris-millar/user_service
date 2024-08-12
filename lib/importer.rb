class Importer
  def self.import(csv_file)
    csv_content = csv_file.read
    raw_users = CSV.parse(csv_content, headers: true, return_headers: false).map(&:fields)

    import = Import.create(filename: csv_file.original_filename, status: "init", performed_at: Time.now)
    begin
      created_users = raw_users.map do |raw_user|
        User.create(import_id: import.id, **raw_hash(raw_user))
      end
      import.update(status: "done", record_count: created_users.size)

    rescue => e
      import.update(status: "error")
    end
    import
  end

  def self.import_from(csv_file)
    raw_users = CSV.open(csv_file, headers: true, return_headers: false).map(&:fields)

    raw_users.map do |raw_user|
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