import java.io.*;
import java.util.*;

public class Main {
 public static void main(String[] args) throws Exception {
  BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  StringTokenizer st = new StringTokenizer(br.readLine());
  int A = Integer.parseInt(st.nextToken());
  int B = Integer.parseInt(st.nextToken());
  int curNum = 1; // 현재 더하고 있는 숫자
  int curCnt = 1; // curNum을 더한 횟수
  int sumA = 0;
  int sumTotal = 0;
  for (int i = 1; i <= B; i++) {
    // i번째 수
    if (i == A) {
      sumA = sumTotal; // (A - 1)번째 수까지의 합을 저장
    }

    if (curCnt < curNum) {
      sumTotal += curNum;
      curCnt += 1;
    } else {
      sumTotal += curNum;
      curCnt = 1;
      curNum += 1;
    }
  }
  System.out.println(sumTotal - sumA);
 }
}
