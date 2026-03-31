FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Portfolio.Api/Portfolio.Api.csproj Portfolio.Api/
COPY data/ data/
RUN dotnet restore Portfolio.Api/Portfolio.Api.csproj

COPY Portfolio.Api/ Portfolio.Api/
COPY data/ data/
RUN dotnet publish Portfolio.Api/Portfolio.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 10000
ENTRYPOINT ["sh", "-c", "dotnet Portfolio.Api.dll --urls http://0.0.0.0:${PORT:-10000}"]
