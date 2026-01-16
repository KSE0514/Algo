import java.io.*;
import java.util.*;

public class Main {
  static int N, M;
  static char[][] arr;
  static boolean[][] visited;

  static int[][] horiz = {{0, 1}, {0, -1}};
  static int[][] verti = {{1, 0}, {-1, 0}};

  public static void bfs(int stR, int stC) {
    Deque<int[]> dq = new ArrayDeque<>();
    dq.offerLast(new int[]{stR, stC});

    int[][] dir = (arr[stR][stC] == '-') ? horiz : verti;
  
    while (!dq.isEmpty()) {
      int[] cur = dq.pollFirst();
      for (int i = 0; i < 2; i++) {
        int newR = cur[0] + dir[i][0];
        int newC = cur[1] + dir[i][1];
        if (newR < 0 || newR >= N || newC < 0 || newC >= M) continue;
        if (arr[newR][newC] == arr[stR][stC] && !visited[newR][newC]) {
          visited[newR][newC] = true;
          dq.offerLast(new int[]{newR, newC});
        }
      }
    }
  }
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st = new StringTokenizer(br.readLine());
    N = Integer.parseInt(st.nextToken());
    M = Integer.parseInt(st.nextToken());

    // 2차원 배열 채우기
    arr = new char[N][M];
    for (int i = 0; i < N; i++) {
      String line = br.readLine();
      for (int j = 0; j < M; j++) {
        arr[i][j] = line.charAt(j);
      }
    }

    visited = new boolean[N][M];
    int cnt = 0; // 타일 개수 카운트
    for (int r = 0; r < N; r++) { 
      for (int c = 0; c < M; c++) {
        if (!visited[r][c]) {
          visited[r][c] = true;
          cnt++;
          bfs(r, c);
        }
      }
    }

    System.out.println(cnt);
  }
}
