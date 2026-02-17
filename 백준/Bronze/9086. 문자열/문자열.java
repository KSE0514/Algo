import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int T = Integer.parseInt(br.readLine());
    while (T-- > 0) {
      String str = br.readLine();
      char stChar = str.charAt(0);
      char edChar = str.charAt(str.length()-1);
      System.out.println(""+ stChar + edChar);
    }
  }
}
