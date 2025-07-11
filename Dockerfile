
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src


COPY . .


# COPY the ZscalerRootCertificate if it exists in the build context.
COPY ["Zscaler Root CA.*", "ZscalerRootCertificate.crt"] 
# If the cert does exist, install in it, so that Nuget can use it
RUN if [ -f "ZscalerRootCertificate.crt" ]; then cp ZscalerRootCertificate.crt /usr/local/share/ca-certificates/ && update-ca-certificates --fresh ; fi


RUN dotnet restore "pefi.homepage.csproj"

RUN dotnet publish "pefi.homepage.csproj"  -c Release -o /app/publish


FROM nginx:alpine
WORKDIR /var/www/web
COPY --from=build /app/publish/wwwroot .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80