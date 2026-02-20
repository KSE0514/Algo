import java.io.*;
import java.math.BigInteger;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    String N = br.readLine();

    int mod = 20000303;
    long remainder = 0;
    for (int i = 0; i < N.length(); i++) {
      remainder = (remainder * 10 + (N.charAt(i) - '0')) % mod;
    }

    System.out.println(remainder);
  }
}
