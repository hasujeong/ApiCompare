<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.BufferedWriter" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.net.URL" %>
<% request.setCharacterEncoding("utf-8"); %>
<%!
public static String apiTestGet(String param) throws Exception 
{
    URL url = null;
    String readLine = null;
    StringBuilder buffer = null;
    BufferedReader bufferedReader = null;
    BufferedWriter bufferedWriter = null;
    HttpURLConnection urlConnection = null;
        
    int connTimeout = 5000;
    int readTimeout = 3000;
        
    String apiUrl = param;         
        
    try 
    {
        url = new URL(apiUrl);
        urlConnection = (HttpURLConnection)url.openConnection();
        urlConnection.setRequestMethod("GET");
        urlConnection.setConnectTimeout(connTimeout);
        urlConnection.setReadTimeout(readTimeout);
        urlConnection.setRequestProperty("Accept", "application/json;");
            
        buffer = new StringBuilder();
        if(urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) 
        {
            bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));
            while((readLine = bufferedReader.readLine()) != null) 
            {
                buffer.append(readLine).append("\n");
            }
        }
        else 
        {
            buffer.append("code : ");
            buffer.append(urlConnection.getResponseCode()).append("\n");
            buffer.append("message : ");
            buffer.append(urlConnection.getResponseMessage()).append("\n");
        }
    }
    catch(Exception ex) 
    {
        ex.printStackTrace();
    }
    finally 
    {
        try 
        {
            if (bufferedWriter != null) { bufferedWriter.close(); }
            if (bufferedReader != null) { bufferedReader.close(); }
        }
        catch(Exception ex) 
        { 
            ex.printStackTrace();
        }
    }
        
    	String rs = buffer.toString();
        
        return rs;
    }

%>
<%
try {
	String rs = apiTestGet(request.getParameter("url"));
	
	out.print(rs);
} catch (Exception e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
%>