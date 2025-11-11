import java.util.Scanner;

public class TimUocSoChungLonNhat {

    public static void main(String[] args) {
        int a;
        int b;
        Scanner sc = new Scanner(System.in);
        System.out.println("enter a:");
        a = sc.nextInt();
        System.out.println("enter b:");
        b = sc.nextInt();

        a = Math.abs(a);
        b = Math.abs(b);

        if (a == 0 || b == 0) {
            System.out.println("Không có ước số chung lớn nhất");
        }
        while (a != b) {
            if (a > b) {
                a = a - b;
            } else {
                b = b - a;
            }
        }
        System.out.println("Có ước chung lớn nhất là: " + a);

    }
}