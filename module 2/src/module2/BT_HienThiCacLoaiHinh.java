package VongLapTrongJava;

import java.util.Scanner;

public class BT_HienThiCacLoaiHinh {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        int a, b;
        do {
            System.out.println("\n========= MENU =========");
            System.out.println("1. In hinh chu nhat");
            System.out.println("2. In tam giac vuong (goc vuong bottom-left)");
            System.out.println("3. In tam giac vuong (goc vuong top-left)");
            System.out.println("4. In tam giac can");
            System.out.println("5. Thoat");
            System.out.print("Nhap lua chon: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Nhap chieu dai: ");
                    a = sc.nextInt();
                    System.out.print("Nhap chieu rong: ");
                    b = sc.nextInt();
                    for (int i = 1; i <= a; i++) {
                        for (int j = 1; j <= b; j++) {
                            System.out.print("* ");
                        }
                        System.out.println();
                    }
                    break;

                case 2:
                    System.out.print("Nhap chieu cao: ");
                    a = sc.nextInt();
                    for (int i = 1; i <= a; i++) {
                        for (int j = 1; j <= i; j++) {
                            System.out.print("* ");
                        }
                        System.out.println();
                    }
                    break;

                case 3:
                    System.out.print("Nhap chieu cao: ");
                    a = sc.nextInt();
                    for (int i = a; i >= 1; i--) {
                        for (int j = 1; j <= i; j++) {
                            System.out.print("* ");
                        }
                        System.out.println();
                    }
                    break;

                case 4:
                    System.out.print("Nhap chieu cao tam giac can: ");
                    a = sc.nextInt();
                    for (int i = 1; i <= a; i++) {

                        for (int j = 1; j <= a - i; j++) {
                            System.out.print("  ");
                        }

                        for (int k = 1; k <= 2 * i - 1; k++) {
                            System.out.print("* ");
                        }
                        System.out.println();
                    }
                    break;

                case 5:
                    System.out.println("Thoat chuong trinh.");
                    break;

                default:
                    System.out.println("Lua chon khong hop le!");
            }

        } while (choice != 5);

        sc.close();
    }
}

