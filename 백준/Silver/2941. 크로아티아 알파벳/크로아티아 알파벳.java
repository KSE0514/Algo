import java.io.*;
import java.util.*;

public class Main {
 public static void main(String[] args) throws Exception {
  BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  String str = br.readLine();
  int strLen = str.length();
  List<String> croatia = new ArrayList<>(Arrays.asList(
      "c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="
  ));


  int idx = 0;
  int cnt = 0; // 크로아티아 알파벳 수
  while (idx < strLen) {
    // 3글자 먼저 체크
    if (idx + 3 <= strLen) {
      String three = str.substring(idx, idx + 3);
      if (croatia.contains(three)) {
        cnt++;
        idx += 3;
        continue;
      }
    }

    // 2글자 체크
    if (idx + 2 <= strLen) {
      String two = str.substring(idx, idx + 2);
      if (croatia.contains(two)) {
        cnt++;
        idx += 2;
        continue;
      }
    }

    // 일반 문자
    cnt++;
    idx++;
   }

  System.out.println(cnt);
 }
}
