#include <iostream>
#include <limits>
#include <stdlib.h>
#include <vector>
 
using namespace std;
 
const int INF = numeric_limits<int>::max();
 
int N = 8;
int* queenposition;
 
int* columnsum;
int* upperdiagonalsum;
int* lowerdiagonalsum;
 
// runtime: n^2
void Initialization() {
    queenposition = new int[N];
 
    columnsum = new int[N];
    upperdiagonalsum = new int[(2*N)-1];
    lowerdiagonalsum = new int[(2*N)-1];
 
    for(int i=0; i<2*N-1; i++) {
        if(i<N) {
            columnsum[i]=0;
        }
        upperdiagonalsum[i]=lowerdiagonalsum[i]=0;
    }
 
    vector<int> minimumconflictcolumns;
    int minimumconflicts=INF;
    int temp;
 
    // choose first queen randomly
    queenposition[0] = rand()%N;
 
    columnsum[queenposition[0]] += 1;
    upperdiagonalsum[queenposition[0]+0] += 1;
    lowerdiagonalsum[(N-queenposition[0])+0-1] += 1;
 
    // i=row index
    for(int i=1; i<N; i++) {
        minimumconflictcolumns.clear();
        minimumconflicts = INF;
        // j=col index
        for(int j=0; j<N; j++) {
            temp = ((columnsum[j]+1)*columnsum[j])/2;
            temp += ((upperdiagonalsum[j+i]+1)*upperdiagonalsum[j+i])/2;
            temp += ((lowerdiagonalsum[(N-j)+i-1]+1)*lowerdiagonalsum[(N-j)+i-1])/2;
 
            if(temp < minimumconflicts) {
                minimumconflicts=temp;
                minimumconflictcolumns.clear();
                minimumconflictcolumns.push_back(j);
            } else if(temp == minimumconflicts) {
                minimumconflictcolumns.push_back(j);
            }
        }
        queenposition[i] = minimumconflictcolumns[rand()%minimumconflictcolumns.size()];
 
        columnsum[queenposition[i]] += 1;
        upperdiagonalsum[queenposition[i]+i] += 1;
        lowerdiagonalsum[(N-queenposition[i])+i-1] += 1;
    }
}
// runtime: n
int getconflicts(int excludeRow) {
    int conflicts=0;
 
    for(int i=0; i<2*N-1; i++) {
        if(i<N) {
            columnsum[i]=0;
        }
        upperdiagonalsum[i]=lowerdiagonalsum[i]=0;
    }
 
    for(int i=0; i<N; i++) {
        if(i != excludeRow) {
            columnsum[queenposition[i]] += 1;
            upperdiagonalsum[queenposition[i]+i] += 1;
            lowerdiagonalsum[(N-queenposition[i])+i-1] += 1;
        }
    }
 
    for(int i=0; i<2*N-1; i++) {
        if(i<N) {
            conflicts += ((columnsum[i]-1)*columnsum[i])/2;
        }
        conflicts += ((upperdiagonalsum[i]-1)*upperdiagonalsum[i])/2;
        conflicts += ((lowerdiagonalsum[i]-1)*lowerdiagonalsum[i])/2;
    }
    return conflicts;
}
 
int getconflicts() {
    return getconflicts(-1);
}
 
 
 
void Print() {
    for(int i=0; i<N; i++) {
         for(int j=0; j<=N; j++) {
            cout << "--";
        }
        cout << endl;
        for(int j=0; j<queenposition[i]; j++) {
            cout << "| ";
        }
        cout << "|Q";
        for(int j=0; j<N-queenposition[i]-1; j++) {
            cout << "| ";
        }
        cout << "|\n";
 
    }
     for(int j=0; j<=N; j++) {
            cout << "--";
        }
    cout << endl;
    cout << "Conflicts: " << getconflicts() << "\n\n";
}
 
// calculates row with most conflicts
// runtime: n
int MaximumConflicts() {
    int rowconflicts=0;
    int temp;
    vector<int> maxrowsconflict;
 
    for(int i=0; i<N; i++) {
        temp = ((columnsum[queenposition[i]]-1)*columnsum[queenposition[i]])/2;
        temp += ((upperdiagonalsum[queenposition[i]+i]-1)*upperdiagonalsum[queenposition[i]+i])/2;
        temp += ((lowerdiagonalsum[(N-queenposition[i])+i-1]-1)*lowerdiagonalsum[(N-queenposition[i])+i-1])/2;
 
        if(temp > rowconflicts) {
            rowconflicts=temp;
            maxrowsconflict.clear();
            maxrowsconflict.push_back(i);
        } else if(temp == rowconflicts) {
            maxrowsconflict.push_back(i);
        }
    }
    return maxrowsconflict[rand()%maxrowsconflict.size()];
}
 
// runtime: n
void minimumconflicts() {
    int highestrowconflict = MaximumConflicts();
 
    int minimumconflicts=INF;
    int temp;
    // min conflicts cols for queen
    vector<int> minimumconflictcolumns;
 
    //Print();
    getconflicts(highestrowconflict);
 
    // i=column index
    for(int i=0; i<N; i++) {
        temp = ((columnsum[i]+1)*columnsum[i])/2;
        temp += ((upperdiagonalsum[i+highestrowconflict]+1)*upperdiagonalsum[i+highestrowconflict])/2;
        temp += ((lowerdiagonalsum[(N-i)+highestrowconflict-1]+1)*lowerdiagonalsum[(N-i)+highestrowconflict-1])/2;
 
        if(temp < minimumconflicts) {
            minimumconflicts=temp;
            minimumconflictcolumns.clear();
            minimumconflictcolumns.push_back(i);
        } else if(temp == minimumconflicts) {
            minimumconflictcolumns.push_back(i);
        }
    }
    queenposition[highestrowconflict]=minimumconflictcolumns[rand()%minimumconflictcolumns.size()];
}
 
int main() {
 
    cout << " Enter the number of queens \n";
    cin >> N;
 
 
    if(N < 4) {
        cout << "No solutions. The number of queen is less than 4." << endl;
        return 0;
    }
 
    cout << "Number of queens: " << N << endl;
 
    srand(time(0));
    Initialization();
 
 
 
    int preconflicts = getconflicts();
    int currentconflicts;
 
 
    int count = 0;
    int steps = 0;
 
    cout << "Solving..." << endl;
 
    while(preconflicts != 0)    {
        minimumconflicts();
        steps++;
        currentconflicts = getconflicts();
        if(preconflicts == currentconflicts) {
            count++;
            if(count>1) {
                queenposition[rand()%N] = rand()%N;
                count = 0;
            }
        }
        preconflicts = currentconflicts;
    }
 
    if(N <= 20) {
        Print();
    }
    cout << "Total number number of steps to get final configuration with zero conflicts: " << steps << "\n\n";
 
    return 0;
}