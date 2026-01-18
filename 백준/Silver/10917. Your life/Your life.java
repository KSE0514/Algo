import java.io.*;
import java.util.*;

public class Main {
  static int N;
  static int M;
  static int[] visited;
  static ArrayList<Integer>[] G;

  public static int bfs(int start) {
    Deque<Integer> dq = new ArrayDeque<>();
    visited[start] = 1;
    dq.offerLast(start);

    while (!dq.isEmpty()) {
      int cur = dq.pollFirst();
      if (cur == N) {
        return visited[cur] - 1;
      }
      for (int nxt:G[cur]) {
        if (visited[nxt] == 0) {
          visited[nxt] = visited[cur] + 1;
          dq.offerLast(nxt);
        }
      }
    }
    return -1;
  }

  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;
    st = new StringTokenizer(br.readLine());
    N = Integer.parseInt(st.nextToken());
    M = Integer.parseInt(st.nextToken());
    
    G = new ArrayList[N+1];
    for (int i = 1; i <= N; i++) {
      G[i] = new ArrayList<>();
    }
    visited = new int[N+1];
    for (int i = 0; i < M; i++) {
      st = new StringTokenizer(br.readLine());
      int x = Integer.parseInt(st.nextToken());
      int y = Integer.parseInt(st.nextToken());
      G[x].add(y);
    }

    System.out.println(bfs(1));
  }
}
