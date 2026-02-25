import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    while (true) {
      int N = Integer.parseInt(br.readLine());
      if (N == 0) break;
      System.out.println((N*(N+1))/2);
    }
  }
}
