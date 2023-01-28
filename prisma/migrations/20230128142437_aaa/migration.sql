-- CreateTable
CREATE TABLE "musics" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-01-25'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-01-25'::date,

    CONSTRAINT "musics_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "musicsPlaylists" (
    "id" SERIAL NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "musicsId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-01-25'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-01-25'::date,

    CONSTRAINT "musicsPlaylists_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-01-25'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-01-25'::date,

    CONSTRAINT "playlists_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-01-25'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-01-25'::date,

    CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-01-25'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-01-25'::date,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "musicsPlaylists" ADD CONSTRAINT "musicsPlaylists_fk1" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "musicsPlaylists" ADD CONSTRAINT "musicsPlaylists_fk0" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
