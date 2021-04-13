FROM mcr.microsoft.com/dotnet/sdk:latest

COPY bin/Release/net5.0/publish/ app/

WORKDIR /app

ENTRYPOINT [ "dotnet", "ConfirmationHandler.dll" ]