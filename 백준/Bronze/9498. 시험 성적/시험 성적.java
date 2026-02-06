import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int point = Integer.parseInt(br.readLine());
    char result;
    if (point >= 90 && point <= 100) {
      result = 'A';
    } else if (point >= 80 && point <= 89) {
      result = 'B';
    } else if (point >= 70 && point <= 79) {
      result = 'C';
    }  else if (point >= 60 && point <= 69) {
      result = 'D';
    } else {
      result = 'F';
    }
    
    System.out.println(result);
  }
}
