import 'package:firebase_auth/firebase_auth.dart';
import 'package:men_matter_too/globals/globals.dart';

class FirebaseAuthProvider {
  User? loggedInUser;

  static Stream<User?> get authChanges =>
      FirebaseAuth.instance.idTokenChanges();

  Future<String> signInWithEmail({
    required String email,
    required String password,
  }) async {
    try {
      final userCredential =
          await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      loggedInUser = userCredential.user;

      return kSuccess;
    } on FirebaseAuthException catch (e) {
      return e.message ?? kError;
    } catch (e) {
      return kError;
    }
  }

  Future<String> signUpWithEmail({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      final userCredential =
          await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      await userCredential.user!.updateDisplayName(name);

      return kSuccess;
    } on FirebaseAuthException catch (e) {
      return e.message ?? kError;
    } catch (e) {
      return kError;
    }
  }

  Future<String> forgotPassword({
    required String email,
  }) async {
    try {
      await FirebaseAuth.instance.sendPasswordResetEmail(
        email: email,
      );

      return kSuccess;
    } on FirebaseAuthException catch (e) {
      return e.message ?? kError;
    } catch (e) {
      return kError;
    }
  }

  Future<void> signOut() async {
    await FirebaseAuth.instance.signOut();
  }
}
