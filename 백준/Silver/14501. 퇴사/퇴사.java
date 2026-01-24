import java.io.*;
import java.util.*;

public class Main {
  static int N;
  static int[] T;
  static int[] P;
  static int maxV = 0;
  
  public static void dfs(int stIdx, int midSum) {
    if (stIdx > N) return;

    for (int idx = stIdx; idx < N; idx++) {
      int curTi = T[idx];
      int curPi = P[idx];
      if (idx + curTi <= N) {
        maxV = Math.max(maxV, midSum + curPi);
        dfs(idx + curTi, midSum + curPi);
      }
    }
  };

  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;
    N = Integer.parseInt(br.readLine());
    T = new int[N];
    P = new int[N];
    for (int i = 0; i < N; i++) {
      st = new StringTokenizer(br.readLine());
      int Ti = Integer.parseInt(st.nextToken());
      int Pi = Integer.parseInt(st.nextToken());
      T[i] = Ti;
      P[i] = Pi;
    }

    dfs(0, 0);
    System.out.println(maxV);
  };
};