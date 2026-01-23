import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringTokenizer st;
    int T = Integer.parseInt(br.readLine());
    while (T-- > 0) {
      int n = Integer.parseInt(br.readLine());
      Map<String, Integer> hasMap = new HashMap<>();
      for (int i = 0; i < n; i++) {
        st = new StringTokenizer(br.readLine());
        String cloth = st.nextToken();
        String categ = st.nextToken();
        if (hasMap.containsKey(categ)) {
          int value = hasMap.get(categ);
          hasMap.put(categ, value + 1);
        } else {
          hasMap.put(categ, 1);
        }
      }

      int result = 1;
      List<Integer> categCnt = new ArrayList<>(hasMap.values());
      for (int i = 0; i < categCnt.size(); i++) {
        result *= (categCnt.get(i) + 1);
      }
      System.out.println(result - 1);
    }
  }
};