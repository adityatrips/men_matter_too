import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:men_matter_too/pages/home_page.dart';
import 'package:men_matter_too/pages/post_page.dart';
import 'package:men_matter_too/pages/profile_page.dart';
import 'package:men_matter_too/riverpod_providers/firebase_auth_provider.dart';

class PageViewPage extends StatefulWidget {
  const PageViewPage({super.key});

  @override
  State<PageViewPage> createState() => _PageViewPageState();
}

class _PageViewPageState extends State<PageViewPage> {
  int currentIndex = 0;

  final _pageController = PageController(initialPage: 0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          [
            "Home",
            "Post",
            "Profile",
          ][currentIndex],
        ),
        backgroundColor: Colors.black,
        actions: [
          IconButton(
            onPressed: () async {
              await FirebaseAuthProvider().signOut();
            },
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      bottomNavigationBar: CurvedNavigationBar(
        items: const [
          Icon(Icons.home),
          Icon(Icons.add),
          Icon(Icons.person),
        ],
        height: 56,
        animationCurve: Curves.fastEaseInToSlowEaseOut,
        color: Colors.black,
        index: currentIndex,
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        onTap: (newIndex) {
          currentIndex = newIndex;
          _pageController.jumpToPage(newIndex);
        },
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (int newIndex) {
          setState(() {
            currentIndex = newIndex;
          });
        },
        children: [
          const HomePage(),
          const PostPage(),
          const ProfilePage(),
        ],
      ),
    );
  }
}
