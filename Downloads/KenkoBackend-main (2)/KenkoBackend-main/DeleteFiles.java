import java.io.File;

public class DeleteFiles {
    public static void main(String[] args) {
        String base = "c:/Users/Karla/Downloads/KenkoBackend-main (2)/KenkoBackend-main/src/main/java/com/kenko/demo/medical/";
        String[] files = { "repository.java", "controller.java", "service.java" };
        for (String file : files) {
            File f = new File(base + file);
            if (f.exists()) {
                boolean deleted = f.delete();
                System.out.println("Deleted " + file + ": " + deleted);
            } else {
                System.out.println("File " + file + " not found.");
            }
        }
    }
}
