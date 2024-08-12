FROM ruby:3.3.1

RUN curl -sL https://deb.nodesource.com/setup_22.x | bash - && \
      apt-get install -y nodejs build-essential

WORKDIR /app

COPY Gemfile ./Gemfile
COPY Gemfile.lock ./Gemfile.lock
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN bundle install
RUN npm install

COPY . .

CMD ["bin/rails", "console"]