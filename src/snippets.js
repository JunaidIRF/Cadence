/**
 * Authentic programming snippets for DevType.
 * Multiple snippets per difficulty for C++, Java, and C#.
 * Mirrors snippets.json for standalone/file:// compatibility without CORS restrictions.
 */
(function (global) {
  const SNIPPETS = {
    cpp: {
      easy: [
        {
          name: "Hello World",
          code: "using namespace std;\n\nint main() {\n  cout << \"Hello, World!\" << endl;\n  return 0;\n}"
        },
        {
          name: "Print Variables",
          code: "using namespace std;\n\nint age = 20;\nstring name = \"Alice\";\ncout << \"User: \" << name << \" | Age: \" << age << endl;"
        },
        {
          name: "Input and Output",
          code: "using namespace std;\n\nint a, b;\ncout << \"Enter two numbers: \";\ncin >> a >> b;\ncout << \"Sum = \" << (a + b) << endl;"
        },
        {
          name: "Simple Loop",
          code: "using namespace std;\n\nfor (int i = 1; i <= 5; i++) {\n  cout << \"Count: \" << i << endl;\n}"
        },
        {
          name: "Print Array",
          code: "using namespace std;\n\nint arr[5] = {10, 20, 30, 40, 50};\nfor (int i = 0; i < 5; i++) {\n  cout << arr[i] << \" \";\n}\ncout << endl;"
        },
        {
          name: "If Condition",
          code: "using namespace std;\n\nint score = 85;\nif (score >= 50) {\n  cout << \"Status: Passed!\" << endl;\n} else {\n  cout << \"Status: Failed!\" << endl;\n}"
        },
        {
          name: "Reverse Array",
          code: "using namespace std;\n\nvoid reverseArray(int arr[], int n) {\n  int left = 0, right = n - 1;\n  while (left < right) {\n    swap(arr[left++], arr[right--]);\n  }\n}"
        },
        {
          name: "Find Maximum",
          code: "using namespace std;\n\nint findMax(int arr[], int n) {\n  int maxVal = arr[0];\n  for (int i = 1; i < n; i++) {\n    if (arr[i] > maxVal) maxVal = arr[i];\n  }\n  return maxVal;\n}"
        },
        {
          name: "Sum of Array",
          code: "using namespace std;\n\nint calculateSum(int arr[], int n) {\n  int total = 0;\n  for (int i = 0; i < n; i++) {\n    total += arr[i];\n  }\n  return total;\n}"
        }
      ],
      medium: [
        {
          name: "Binary Search",
          code: "using namespace std;\n\nint binarySearch(int arr[], int n, int target) {\n  int left = 0, right = n - 1;\n  while (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}"
        },
        {
          name: "Check Palindrome",
          code: "using namespace std;\n\nbool isPalindrome(const string& str) {\n  int left = 0, right = str.length() - 1;\n  while (left < right) {\n    if (str[left++] != str[right--]) return false;\n  }\n  return true;\n}"
        },
        {
          name: "Fibonacci Number",
          code: "using namespace std;\n\nint fibonacci(int n) {\n  if (n <= 1) return n;\n  int a = 0, b = 1;\n  for (int i = 2; i <= n; i++) {\n    int next = a + b;\n    a = b;\n    b = next;\n  }\n  return b;\n}"
        }
      ],
      hard: [
        {
          name: "Bubble Sort",
          code: "using namespace std;\n\nvoid bubbleSort(int arr[], int n) {\n  for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        swap(arr[j], arr[j + 1]);\n      }\n    }\n  }\n}"
        },
        {
          name: "Quick Sort Partition",
          code: "using namespace std;\n\nint partition(int arr[], int low, int high) {\n  int pivot = arr[high];\n  int i = low - 1;\n  for (int j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n      swap(arr[++i], arr[j]);\n    }\n  }\n  swap(arr[i + 1], arr[high]);\n  return i + 1;\n}"
        },
        {
          name: "Trie Prefix Tree",
          code: "using namespace std;\n\nstruct TrieNode {\n  TrieNode* children[26] = {};\n  bool isEnd = false;\n};\n\nvoid insertWord(TrieNode* root, const string& word) {\n  TrieNode* curr = root;\n  for (char c : word) {\n    int idx = c - 'a';\n    if (!curr->children[idx]) curr->children[idx] = new TrieNode();\n    curr = curr->children[idx];\n  }\n  curr->isEnd = true;\n}"
        }
      ]
    },
    java: {
      easy: [
        {
          name: "Hello World",
          code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"
        },
        {
          name: "Print Variables",
          code: "String app = \"Cadence\";\nint version = 1;\nSystem.out.println(\"Running \" + app + \" v\" + version);"
        },
        {
          name: "Print Array Loop",
          code: "int[] scores = { 85, 90, 78, 92 };\nfor (int s : scores) {\n    System.out.println(\"Score: \" + s);\n}"
        },
        {
          name: "If Condition",
          code: "int score = 92;\nif (score >= 60) {\n    System.out.println(\"Result: Pass\");\n} else {\n    System.out.println(\"Result: Fail\");\n}"
        },
        {
          name: "Factorial",
          code: "public class MathUtils {\n    public static long factorial(int n) {\n        long result = 1;\n        for (int i = 2; i <= n; i++) {\n            result *= i;\n        }\n        return result;\n    }\n}"
        },
        {
          name: "Count Vowels",
          code: "public class StringUtils {\n    public static int countVowels(String str) {\n        int count = 0;\n        String vowels = \"aeiouAEIOU\";\n        for (char c : str.toCharArray()) {\n            if (vowels.indexOf(c) != -1) count++;\n        }\n        return count;\n    }\n}"
        },
        {
          name: "Reverse String",
          code: "public class TextUtils {\n    public static String reverse(String input) {\n        StringBuilder sb = new StringBuilder(input);\n        return sb.reverse().toString();\n    }\n}"
        }
      ],
      medium: [
        {
          name: "Two Sum",
          code: "public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] { map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    return new int[] {};\n}"
        },
        {
          name: "Valid Parentheses",
          code: "public boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(') stack.push(')');\n        else if (c == '{') stack.push('}');\n        else if (c == '[') stack.push(']');\n        else if (stack.isEmpty() || stack.pop() != c) return false;\n    }\n    return stack.isEmpty();\n}"
        },
        {
          name: "Merge Two Lists",
          code: "public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    if (list1 == null) return list2;\n    if (list2 == null) return list1;\n    if (list1.val < list2.val) {\n        list1.next = mergeTwoLists(list1.next, list2);\n        return list1;\n    } else {\n        list2.next = mergeTwoLists(list1, list2.next);\n        return list2;\n    }\n}"
        }
      ],
      hard: [
        {
          name: "LRU Cache",
          code: "class LRUCache {\n    private final int capacity;\n    private final LinkedHashMap<Integer, Integer> map;\n\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        this.map = new LinkedHashMap<>(capacity, 0.75f, true);\n    }\n\n    public int get(int key) {\n        return map.getOrDefault(key, -1);\n    }\n}"
        },
        {
          name: "Trie Prefix Tree",
          code: "class TrieNode {\n    TrieNode[] children = new TrieNode[26];\n    boolean isEndOfWord;\n\n    public void insert(String word) {\n        TrieNode curr = this;\n        for (char c : word.toCharArray()) {\n            int index = c - 'a';\n            if (curr.children[index] == null) {\n                curr.children[index] = new TrieNode();\n            }\n            curr = curr.children[index];\n        }\n        curr.isEndOfWord = true;\n    }\n}"
        },
        {
          name: "Word Break",
          code: "public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> set = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n    for (int i = 1; i <= s.length(); i++) {\n        for (int j = 0; j < i; j++) {\n            if (dp[j] && set.contains(s.substring(j, i))) {\n                dp[i] = true;\n                break;\n            }\n        }\n    }\n    return dp[s.length()];\n}"
        }
      ]
    },
    csharp: {
      easy: [
        {
          name: "Hello World",
          code: "using System;\n\nConsole.WriteLine(\"Hello, World!\");"
        },
        {
          name: "String Interpolation",
          code: "string user = \"Developer\";\nint score = 100;\nConsole.WriteLine($\"Player: {user} | Score: {score}\");"
        },
        {
          name: "Simple Loop",
          code: "for (int i = 1; i <= 5; i++)\n{\n    Console.WriteLine($\"Loop counter: {i}\");\n}"
        },
        {
          name: "If Condition",
          code: "int temperature = 28;\nif (temperature > 25)\n{\n    Console.WriteLine(\"It is warm outside.\");\n}"
        },
        {
          name: "Clamp Utility",
          code: "public static class MathHelper\n{\n    public static int Clamp(int value, int min, int max)\n    {\n        if (value < min) return min;\n        if (value > max) return max;\n        return value;\n    }\n}"
        },
        {
          name: "Number Utils",
          code: "public static class NumberUtils\n{\n    public static bool IsEven(int number) => (number & 1) == 0;\n    public static int Square(int x) => x * x;\n}"
        },
        {
          name: "FizzBuzz Pattern",
          code: "public static string FizzBuzz(int n) => n switch\n{\n    _ when n % 15 == 0 => \"FizzBuzz\",\n    _ when n % 3 == 0 => \"Fizz\",\n    _ when n % 5 == 0 => \"Buzz\",\n    _ => n.ToString()\n};"
        }
      ],
      medium: [
        {
          name: "Player Controller",
          code: "public class PlayerController\n{\n    public int Health { get; private set; } = 100;\n    public bool IsAlive => Health > 0;\n\n    public void TakeDamage(int damage)\n    {\n        Health = Math.Max(0, Health - damage);\n    }\n}"
        },
        {
          name: "Inventory Manager",
          code: "public class Inventory\n{\n    private readonly List<string> _items = new();\n\n    public void AddItem(string item) => _items.Add(item);\n    public bool HasItem(string item) => _items.Contains(item);\n    public int Count => _items.Count;\n}"
        },
        {
          name: "Result Monad",
          code: "public readonly struct Result<T>\n{\n    public T Value { get; }\n    public bool IsSuccess { get; }\n    public string Error { get; }\n\n    public Result(T value) => (Value, IsSuccess, Error) = (value, true, string.Empty);\n    public Result(string error) => (Value, IsSuccess, Error) = (default!, false, error);\n}"
        }
      ],
      hard: [
        {
          name: "Event Bus",
          code: "public class EventBus\n{\n    private readonly Dictionary<Type, List<Action<object>>> _subscribers = new();\n\n    public void Subscribe<T>(Action<object> handler)\n    {\n        var type = typeof(T);\n        if (!_subscribers.ContainsKey(type))\n            _subscribers[type] = new List<Action<object>>();\n        _subscribers[type].Add(handler);\n    }\n}"
        },
        {
          name: "Generic Repository",
          code: "public interface IRepository<T> where T : class\n{\n    Task<T?> GetByIdAsync(int id);\n    Task<IReadOnlyList<T>> GetAllAsync();\n    Task AddAsync(T entity);\n    void Update(T entity);\n    void Delete(T entity);\n}"
        },
        {
          name: "Async Pipeline",
          code: "public class Pipeline<T>\n{\n    private readonly List<Func<T, Task<T>>> _steps = new();\n\n    public Pipeline<T> Use(Func<T, Task<T>> step)\n    {\n        _steps.Add(step);\n        return this;\n    }\n\n    public async Task<T> ExecuteAsync(T input)\n    {\n        T current = input;\n        foreach (var step in _steps)\n            current = await step(current);\n        return current;\n    }\n}"
        }
      ]
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SNIPPETS;
  } else {
    global.DevTypeSnippets = SNIPPETS;
  }
})(typeof window !== 'undefined' ? window : globalThis);
