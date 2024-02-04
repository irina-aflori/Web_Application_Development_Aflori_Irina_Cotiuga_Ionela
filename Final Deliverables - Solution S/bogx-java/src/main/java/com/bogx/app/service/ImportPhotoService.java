package com.bogx.app.service;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.File;
import java.io.IOException;

public class ImportPhotoService {
    private static final String CLIENT_ID = "95aff8f0cd9c810";

    public static String uploadImage(String imagePath) throws IOException, InterruptedException {
        String uploadEndpoint = "https://api.imgur.com/3/image";

        String folderPath = "C:\\Flowers\\";
        imagePath = folderPath + imagePath;
        File file = new File(imagePath);

        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.addBinaryBody("image", file, ContentType.DEFAULT_BINARY, file.getName());

        HttpEntity entity = builder.build();
        HttpUriRequest request = RequestBuilder.post(uploadEndpoint)
                .setEntity(entity)
                .addHeader("Authorization", "Client-ID " + CLIENT_ID)
                .build();

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(request)) {

            String jsonResponse = EntityUtils.toString(response.getEntity());
            String link = jsonResponse.substring(jsonResponse.indexOf("link") + 7, jsonResponse.indexOf("\"", jsonResponse.indexOf("link") + 7));

            return link;
        }
    }
}
