import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int T = Integer.parseInt(br.readLine());
    StringTokenizer st;
    for (int i = 0; i < T; i++) {
      st = new StringTokenizer(br.readLine());
      int A = Integer.parseInt(st.nextToken());
      int B = Integer.parseInt(st.nextToken());
      System.out.printf("Case #%d: %d\n", i+1, A+B);
    }
  }
}
