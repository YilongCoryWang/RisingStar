@author: Cory Wang
@date: Sept, 2019

1. Project Description:
	This project is aiming at helping students who have entrepreneur projects and investors who are willing to help bringing this ideas reality financially.
	
	There are two roles in this project:
	1.1) student:
		Students can register themselves and update their projects into the website, so that the registered investors will be able to view them.
		
	1.2) investor:
		Investors can register themselves to the website so that they will be able to view all the entrepreneur projects on the website registered, then choose their interested ones to invest their money in.
		
2. How to run:
	2.1) Run MongoDB:
		>mongod --dbpath "your MongoDB path"
	2.2) Run Web Server
	   > cd P2P
	P2P> npm start
	3.3) How to import mock data from file, please refer to ./server/database/importDataFileToDB.txt
	
3. For developers:
	3.1) compile client react:
	P2P> webpack
	3.1) compile client less:
	P2P> gulp dev