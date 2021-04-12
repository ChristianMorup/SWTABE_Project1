FROM mcr.microsoft.com/dotnet/sdk:latest

COPY . ./

RUN dotnet restore

RUN dotnet publish --configuration=Release

ENTRYPOINT [ "dotnet", "./bin/Release/BookingSender.dll" ]