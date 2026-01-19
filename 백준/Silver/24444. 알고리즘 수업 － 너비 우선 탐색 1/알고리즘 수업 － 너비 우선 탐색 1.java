import java.io.*;
import java.util.*;

public class Main {
  static int N;
  static int M;
  static int R;
  static ArrayList<Integer>[] G;
  static int[] visited;
  static int visiteNum = 1;

  public static void bfs(int start) {
    Deque<Integer> dq = new ArrayDeque<>();
    visited[start] = visiteNum++;
    dq.offerLast(start);

    while (!dq.isEmpty()) {
      int cur = dq.pollFirst();
      for (int nxt:G[cur]) {
        if (visited[nxt] == 0) {
          visited[nxt] = visiteNum++;
          dq.offerLast(nxt);
        }
      }
    }
  }

  public static void main(String[] args) throws Exception{
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;
    st = new StringTokenizer(br.readLine());
    N = Integer.parseInt(st.nextToken());
    M = Integer.parseInt(st.nextToken());
    R = Integer.parseInt(st.nextToken());

    G = new ArrayList[N+1];
    for (int i = 1; i <= N; i++) {
      G[i] = new ArrayList<>();
    }
    visited = new int[N+1];
    for (int i = 0; i < M; i++) {
      st = new StringTokenizer(br.readLine());
      int u = Integer.parseInt(st.nextToken());
      int v = Integer.parseInt(st.nextToken());
      G[u].add(v);
      G[v].add(u);
    }
    for (int i = 1; i <= N; i++) {
      Collections.sort(G[i]);
    }

    bfs(R);
    StringBuilder sb = new StringBuilder();
    for (int i = 1; i <= N; i++) {
      sb.append(visited[i]).append('\n');
    }
    System.out.println(sb);
  }
}
