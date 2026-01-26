import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st = new StringTokenizer(br.readLine());
    long N = Long.parseLong(st.nextToken());
    int L = Integer.parseInt(st.nextToken());

    for (int k = L; k <= 100; k++) {
      long temp = N - (long) k * (k - 1) / 2;
      if (temp < 0) break;

      if (temp % k == 0) {
        long x = temp / k;
        if (x >= 0) {
          StringBuilder sb = new StringBuilder();
          for (long i = 0; i < k; i++) {
            sb.append(x + i).append(" ");
          }
          System.out.println(sb.toString().trim());
          return;
        }
      }
    }

    System.out.println(-1);
  }
}
