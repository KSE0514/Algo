import java.io.*;
import java.util.*;

public class Main {
  static int X;
  static int Y;
  static char[][] arr;
  static int visited[][];

  public static int bfs(int stR, int stC) {
    Deque<int[]> dq = new ArrayDeque<>();
    dq.offerLast(new int[] {stR, stC});
    visited[stR][stC] = 1;

    int[][] dir = {{1, 2}, {1, -2}, {-1, 2}, {-1, -2}, {2, 1}, {2, -1}, {-2, 1}, {-2, -1}};
    while (!dq.isEmpty()) {
      int[] cur = dq.pollFirst();
      if (arr[cur[0]][cur[1]] == 'H') {
        return visited[cur[0]][cur[1]] - 1;
      }

      for (int i = 0; i < 8; i++) {
        int newR = cur[0] + dir[i][0];
        int newC = cur[1] + dir[i][1];
        if (newR < 0 || newR >= Y || newC < 0 || newC >= X) continue;
        if (arr[newR][newC] != '*' && visited[newR][newC] == 0) {
          visited[newR][newC] = visited[cur[0]][cur[1]] + 1;
          dq.offerLast(new int[] {newR, newC});
        }
      }
    }
    return 0;
  }

  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;
    st = new StringTokenizer(br.readLine());
    X = Integer.parseInt(st.nextToken());
    Y = Integer.parseInt(st.nextToken());

    int stR = -1;
    int stC = -1;
    // 2차원 배열 채우기
    arr = new char[Y][X];
    visited = new int[Y][X];
    for (int r = 0; r < Y; r++) {
      String line = br.readLine();
      for (int c = 0; c < X; c++) {
        arr[r][c] = line.charAt(c);
        if (arr[r][c] == 'K') {
          stR = r;
          stC = c;
        }
      }
    }

    System.out.println(bfs(stR, stC));
  }
}
