import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int N = Integer.parseInt(br.readLine());
    int cnt = 0;
    for (int i = 0; i < N; i++) {
      String str = br.readLine();
      int strLen = str.length();
      ArrayList<Character> charList = new ArrayList<>();
      boolean isGroup = true;
      for (int idx = 0; idx < strLen; idx++) {
        char cur = str.charAt(idx);

        if (charList.contains(cur)) {
          if (idx > 0 && str.charAt(idx - 1) != cur) {
            isGroup = false;
            break;
          }
        } else {
          charList.add(cur);
        }
      }
      if (isGroup) cnt++;
    }
    System.out.println(cnt);
  }
}
