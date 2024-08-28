import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:men_matter_too/globals/globals.dart';
import 'package:men_matter_too/pages/register_page.dart';
import 'package:men_matter_too/riverpod_providers/firebase_auth_provider.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  bool isObscure = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned(
            bottom: 0,
            top: 0,
            right: 0,
            child: SvgPicture.asset(
              "assets/waves.svg",
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              fit: BoxFit.cover,
            ),
          ),
          Container(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Theme.of(context).colorScheme.surface,
                    hintText: 'Email address',
                  ),
                  keyboardType: TextInputType.emailAddress,
                  autofillHints: const [AutofillHints.email],
                  autocorrect: false,
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _passwordController,
                  obscureText: isObscure,
                  keyboardType: TextInputType.visiblePassword,
                  autofillHints: const [AutofillHints.password],
                  autocorrect: false,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Theme.of(context).colorScheme.surface,
                    hintText: 'Password',
                    suffixIcon: GestureDetector(
                      onTap: () {
                        setState(() {
                          isObscure = !isObscure;
                        });
                      },
                      child: Icon(
                        isObscure ? Icons.visibility : Icons.visibility_off,
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () async {
                      if (_emailController.text.isEmpty) {
                        Get.snackbar(
                            "Error", "Please enter your email address.");
                        return;
                      }

                      String status =
                          await FirebaseAuthProvider().forgotPassword(
                        email: _emailController.text,
                      );

                      if (status != kSuccess) {
                        Get.snackbar("Error", status);
                      }

                      Get.snackbar("Success", "Password reset email sent.");
                    },
                    child: const Text("Send password reset email."),
                  ),
                ),
                ElevatedButton(
                  onPressed: () async {
                    if (_emailController.text.isEmpty ||
                        _passwordController.text.isEmpty) {
                      Get.snackbar("Error", "Please fill in all fields.");
                      return;
                    }

                    String status =
                        await FirebaseAuthProvider().signInWithEmail(
                      email: _emailController.text,
                      password: _passwordController.text,
                    );

                    if (status != kSuccess) {
                      Get.snackbar("Error", status);
                    }
                  },
                  child: const Text('Resume the journey 🚀'),
                ),
                ElevatedButton(
                  onPressed: () async {
                    Get.off(() => const RegisterPage());
                  },
                  child: const Text("Already have an account? Sign up."),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
