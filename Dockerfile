FROM ruby:3.3.1

RUN apt-get update -qq && apt-get install -y nodejs npm postgresql-client

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 5

COPY package.json package-lock.json ./
RUN npm install

COPY nginx.conf /etc/nginx/nginx.conf

COPY . .

COPY config/master.key /app/config/master.key
RUN export RAILS_MASTER_KEY=$(cat /app/config/master.key)

COPY /config/ssl/server.crt /etc/nginx/ssl/server.crt
COPY /config/ssl/server.key /etc/nginx/ssl/server.key

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]