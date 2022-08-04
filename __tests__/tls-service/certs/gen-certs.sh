rm *.pem
rm *.srl
rm *.cnf

# 1. Generate CA's private key and self-signed certificate
openssl req -x509 -newkey rsa:4096 -days 365 -nodes -keyout ca-key.pem -out ca-cert.pem -subj "/C=FR/ST=Occitanie/L=Toulouse/O=Test Org/OU=Test/CN=*.test/emailAddress=test@gmail.com"

echo "CA's self-signed certificate"
openssl x509 -in ca-cert.pem -noout -text

# 2. Generate web server's private key and certificate signing request (CSR)
openssl req -newkey rsa:4096 -nodes -keyout server-key.pem -out server-req.pem -subj "/C=FR/ST=Ile de France/L=Paris/O=Server Side TLS/OU=Server/CN=*.tls/emailAddress=tls@gmail.com"

# Remember that when we develop on localhost, It’s important to add the IP:0.0.0.0 as an Subject Alternative Name (SAN) extension to the certificate.
echo "subjectAltName=DNS:*.tls,DNS:*.tls,IP:0.0.0.0" > server-ext.cnf

# 3. Use CA's private key to sign web server's CSR and get back the signed certificate
openssl x509 -req -in server-req.pem -days 60 -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile server-ext.cnf

echo "Server's signed certificate"
openssl x509 -in server-cert.pem -noout -text

# 4. Generate client's private key and certificate signing request (CSR)
openssl req -newkey rsa:4096 -nodes -keyout client-key.pem -out client-req.pem -subj "/C=FR/ST=Alsace/L=Strasbourg/O=PC Client/OU=Computer/CN=*.pcclient.com/emailAddress=pcclient@gmail.com"

# Remember that when we develop on localhost, It’s important to add the IP:0.0.0.0 as an Subject Alternative Name (SAN) extension to the certificate.
echo "subjectAltName=DNS:*.pcclient.com,IP:0.0.0.0" > client-ext.cnf

# 5. Use CA's private key to sign client's CSR and get back the signed certificate
openssl x509 -req -in client-req.pem -days 60 -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out client-cert.pem -extfile client-ext.cnf

echo "Client's signed certificate"
openssl x509 -in client-cert.pem -noout -text
