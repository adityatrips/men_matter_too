import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class ErrorPage extends StatelessWidget {
  const ErrorPage({
    super.key,
    required this.error,
    required this.canPop,
  });

  final String error;
  final bool canPop;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(
              horizontal: 24,
              vertical: 12,
            ),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.error,
            ),
            child: Text(
              "E R R O R",
              style: TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 24,
                color: Theme.of(context).colorScheme.onError,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          const Spacer(),
          Lottie.asset(
            "assets/lottie/error.json",
            repeat: false,
            animate: true,
            frameRate: FrameRate.max,
          ),
          canPop
              ? ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("Go back!"),
                )
              : const SizedBox.shrink(),
          const Spacer(),
        ],
      ),
    );
  }
}
