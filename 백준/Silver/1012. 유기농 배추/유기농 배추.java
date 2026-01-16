import java.io.*;
import java.util.*;

public class Main {
  static int N;
  static int M;
  static int[][] arr;
  static boolean[][] visited;

  public static void bfs(int stR, int stC) {
    Deque<int[]> dq = new ArrayDeque();
    dq.offerLast(new int[] {stR, stC});

    int[][] dir = new int[][] {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
    while (!dq.isEmpty()) {
      int[] cur = dq.pollFirst();
      for (int i = 0; i < 4; i++) {
        int newR = cur[0] + dir[i][0];
        int newC = cur[1] + dir[i][1];
        if (newR < 0 || newR >= N || newC < 0 || newC >= M) continue;
        if (arr[newR][newC] == 1 && !visited[newR][newC]) {
          visited[newR][newC] = true;
          dq.offerLast(new int[] {newR, newC});
        }
      }
    }
  }

  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int T = Integer.parseInt(br.readLine());
    StringTokenizer st;
    // 테스트 케이스만큼 반복
    StringBuilder sb = new StringBuilder();
    while (T-- > 0) {
      st = new StringTokenizer(br.readLine());
      N = Integer.parseInt(st.nextToken()); // 행
      M = Integer.parseInt(st.nextToken()); // 열
      int K = Integer.parseInt(st.nextToken()); // 배추가 심어져 있는 땅의 수
      arr = new int[N][M]; // 배추밭
      visited = new boolean[N][M];

      int row;
      int col;
      while (K-- > 0) {
        st = new StringTokenizer(br.readLine());
        row = Integer.parseInt(st.nextToken());
        col = Integer.parseInt(st.nextToken());
        arr[row][col] = 1;
      }

      int cnt = 0;
      for (int r = 0; r < N; r++) {
        for (int c = 0; c < M; c++) {
          if (arr[r][c] == 1 && !visited[r][c]) {
            visited[r][c] = true;
            cnt++;
            bfs(r, c);
          }
        }
      }
      sb.append(cnt).append('\n');
    }
    // 출력
    System.out.println(sb);
  }
}
