# WiFiLit
Connects mobile devices that are on the same wifi network to a localized chatroom. Currently only supports iOS.

Have you ever wished you could text someone in the same room but you don't have their contact information or even know who they are? Now you can talk to anybody who is connected on the same wifi. LIT!

# The Stack

React Native
-Mobile Client.
-Did not use any development library, allowing access to iOS native modules.

Socket.io
-Real-time communication.
-Connects client to a separate server that is running on a AWS EC2 instance.

MongoDb
-Persistent data to allow users to revisit chatrooms and view previous messages.
-GridFS to transfer and store large files.

Scaling
-Artillery.io to test latency, throughput, RPS, etc.
-Nginx to load balance to multiple node server instances.
-Redis to cache database queries.

# Future Implementations:
React Native Web - Allows cross platform connections between iOS, Android, and Web all from a single codebase.

Contacts List - you can see if your added friends are currently online on a specific wifi.

Private Chat - create your own private chatrooms with whomever you want.

Poke Notifications - poke someone and send a notification through the app to their phone.

Shared Music Playlist - add a song from your phone onto the current wifi playlist and listen simultatneously on multiple devices.

Gmail, Facebook, Instagram Login - Allows easy sign up and easily creates unique username accounts.

Better Chat Interface - Yellow, Orange, Red Speech Bubbles. Different color usernames.

Switch WiFi from inside the app - Allows you to programmatically connect to a different nearby WiFi connection, which automatically switches you to its chatroom.

Media File Support - allows you to post images and videos to chatrooms.

TypeScript for React Native - Supports better scalability and more efficient team collaboration.