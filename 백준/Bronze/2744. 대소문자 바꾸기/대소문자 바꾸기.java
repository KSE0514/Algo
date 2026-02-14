import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    String str = br.readLine();
    int strLen = str.length();
    StringBuilder sb = new StringBuilder();

    for (int i = 0; i < strLen; i++) {
      char curChar = str.charAt(i);
      if (Character.isUpperCase(curChar)) {
        sb.append(Character.toLowerCase(curChar));
      } else {
        sb.append(Character.toUpperCase(curChar));
      }     
    }

    System.out.println(sb);
  }
}
