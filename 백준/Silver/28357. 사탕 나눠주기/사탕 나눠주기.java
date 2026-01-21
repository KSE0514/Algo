import java.io.*;
import java.util.*;

public class Main {
  static int N;
  static long K;
  static long[] pointList;

  public static long biSearch(long st, long ed) {
    long minX = ed;
    while (st <= ed) {
      long mid = (st + ed) / 2;
      long candyCnt = 0;
      for (int i = 0; i < N; i++) {
        if (pointList[i] > mid) candyCnt += (pointList[i] - mid);
        if (candyCnt > K) break;
      }

      if (candyCnt <= K) {
        minX = mid;
        ed = mid - 1;
      }
      else {
        st = mid + 1;
      }
    }
    return minX;
  }
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;
    st = new StringTokenizer(br.readLine());
    N = Integer.parseInt(st.nextToken());
    K = Long.parseLong(st.nextToken());
    pointList = new long[N];
    st = new StringTokenizer(br.readLine());
    long maxPoint = 0;
    for (int i = 0; i < N; i++) {
      pointList[i] = Long.parseLong(st.nextToken());
      if (pointList[i] > maxPoint) maxPoint = pointList[i];
    }
    
    System.out.println(biSearch(0, maxPoint));
  }
}
