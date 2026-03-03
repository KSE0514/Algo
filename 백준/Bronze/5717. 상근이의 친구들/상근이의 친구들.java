import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;
    while (true) {
      st = new StringTokenizer(br.readLine());
      int M = Integer.parseInt(st.nextToken());
      int F = Integer.parseInt(st.nextToken());
      if (M == 0 && F == 0) break;
  
      System.out.println(M+F);
    }
  }
}
