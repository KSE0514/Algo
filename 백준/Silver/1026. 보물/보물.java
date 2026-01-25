import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;

    int N = Integer.parseInt(br.readLine());
    int[] A = new int[N];
    int[] B = new int[N];
    st = new StringTokenizer(br.readLine());
    for (int i = 0; i < N; i++) {
      int num = Integer.parseInt(st.nextToken());
      A[i] = num;
    }
    st = new StringTokenizer(br.readLine());
    for (int i = 0; i < N; i++) {
      int num = Integer.parseInt(st.nextToken());
      B[i] = num;
    }
    Arrays.sort(A);
    Arrays.sort(B);

    int S = 0;
    for (int i = 0; i < N; i++) {
      S += A[N-i-1] * B[i];
    };
    System.out.println(S);
  }
};
