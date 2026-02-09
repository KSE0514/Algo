import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    String str = br.readLine();
    StringBuilder sb = new StringBuilder();
    int strLen = str.length();
    String[] stList = new String[strLen];

    for (int i = 0; i < strLen; i++) {
      stList[i] = str.substring(i);
    }

    Arrays.sort(stList);
    for (int i = 0; i < strLen; i++) {
      sb.append(stList[i]).append('\n');
    }

    System.out.println(sb);
  }
}
