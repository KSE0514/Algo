import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int gameCnt = 5;
    int sumV = 0;
    while (gameCnt-- > 0) {
      int point = Integer.parseInt(br.readLine());
      sumV += point;
    }
    System.out.println(sumV);
  }
}
